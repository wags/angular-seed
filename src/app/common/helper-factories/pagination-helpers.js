angular.module('ordercloud-pagination-helpers', ['ordercloud-assignment-helpers'])
    .factory('Pagination', PaginationHelpers)

;

function PaginationHelpers($q, OrderCloud) {
    return {
        goToNext: goToNext,
        goToPrevious: goToPrevious,
        goToPage: goToPage,
        getPageRange:getPageRange
    };

function goToNext(ListObject, ServiceName, UserType, AssignmentObjects, AssignmentFunc) {
    var Service = OrderCloud[ServiceName];
    if (Service && ListObject.Meta.Page < ListObject.Meta.TotalPages) {
        var queue = [];
        var dfd = $q.defer();
        if (ServiceName !== 'Orders' && ServiceName !== 'Categories') {
            queue.push(Service.List(null, ListObject.Meta.Page + 1, ListObject.Meta.PageSize));
        }
        if (ServiceName === 'Orders') {
            queue.push(Service.List(UserType == 'admin' ? 'incoming' : 'outgoing', null, null, null, ListObject.Meta.Page + 1, ListObject.Meta.PageSize));
        }
        if (ServiceName === 'Categories') {
            queue.push(Service.List(null, 'all', ListObject.Meta.Page + 1, ListObject.Meta.PageSize));
        }
        if (AssignmentFunc !== undefined && (AssignmentObjects.Meta.Page < AssignmentObjects.Meta.TotalPages)) {
            queue.push(AssignmentFunc());
        }
        $q.all(queue).then(function(results) {
            dfd.resolve();
            ListObject.Meta = results[0].Meta;
            ListObject.Items = results[0].Items;
            if (results[1]) {
                AssignmentObjects.Meta = results[1].Meta;
                AssignmentObjects.Items = results[1].Items;
            }
        });
        return dfd.promise;
    }
    else return null;
}

function goToPrevious(ListObject, ServiceName, UserType, AssignmentObjects, AssignmentFunc) {
    var Service = OrderCloud[ServiceName];
    if (Service && ListObject.Meta.Page > 1) {
        var queue = [];
        var dfd = $q.defer();
        if (ServiceName !== 'Orders' && ServiceName !== 'Categories') {
            queue.push(Service.List(null, ListObject.Meta.Page -1, ListObject.Meta.PageSize));
        }
        if (ServiceName === 'Orders') {
            queue.push(Service.List(UserType == 'admin' ? 'incoming' : 'outgoing', null, null, null, ListObject.Meta.Page -1, ListObject.Meta.PageSize));
        }
        if (ServiceName === 'Categories') {
            queue.push(Service.List(null, 'all', ListObject.Meta.Page -1, ListObject.Meta.PageSize));
        }
        if (AssignmentFunc !== undefined && (AssignmentObjects.Meta.Page > 1 )) {
            queue.push(AssignmentFunc());
        }
        $q.all(queue).then(function(results) {
            dfd.resolve();
            ListObject.Meta = results[0].Meta;
            ListObject.Items = results[0].Items;
            if (results[1]) {
                AssignmentObjects.Meta = results[1].Meta;
                AssignmentObjects.Items = results[1].Items;
            }
        });
        return dfd.promise;
    }
    else return null;
}

function goToPage(ListObject, ServiceName,UserType, Page, AssignmentObjects, AssignmentFunc){
    var Service = OrderCloud[ServiceName];
    var queue = [];
    var dfd = $q.defer();
    if (ServiceName !== 'Orders' && ServiceName !== 'Categories') {
        queue.push(Service.List(null, Page, ListObject.Meta.PageSize));
    }
    if (ServiceName === 'Orders') {
        queue.push(Service.List(UserType == 'admin' ? 'incoming' : 'outgoing', null, null, null, Page, ListObject.Meta.PageSize));
    }
    if (ServiceName === 'Categories') {
        queue.push(Service.List(null, 'all', Page, ListObject.Meta.PageSize));
    }
    if (AssignmentFunc !== undefined) {
        queue.push(AssignmentFunc());
    }
    $q.all(queue).then(function(results) {
        dfd.resolve();
        ListObject.Meta = results[0].Meta;
        ListObject.Items =  results[0].Items;
        if (results[1]) {
            AssignmentObjects.Meta = results[1].Meta;
            AssignmentObjects.Items = results[1].Items;
        }
    });
    return dfd.promise;
}

function getPageRange(TotalPages){
    var pagerange = [];
    var x;
    for(x = 1; x <= TotalPages; x++){
        pagerange.push(x);
    }
    return pagerange;
}
}
