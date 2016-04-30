angular.module( 'orderCloud' )
    .directive('ordercloudPagination', ordercloudPaginationDirective)
;

function ordercloudPaginationDirective(Pagination){
    return {
        scope: {
            controlleras: '=',
            servicename: '@',
            usertype: '@'
        },
        restrict: 'E',
        templateUrl: 'common/pagination/templates/paginationDirective.tpl.html',
        link: function($scope) {
            $scope.currentPage = $scope.controlleras.list.Meta.Page;
            $scope.$watch('controlleras.list.Meta.Page', function(newVal){
                $scope.currentPage = newVal;
            });
            $scope.totalPages = $scope.controlleras.list.Meta.TotalPages;
            $scope.pageRange = Pagination.getPageRange($scope.totalPages);

            $scope.goToPage = function(page){
                Pagination.goToPage($scope.controlleras.list, $scope.servicename, $scope.usertype, page);
            };
            $scope.goToPrevious = function(){
                Pagination.goToPrevious($scope.controlleras.list, $scope.servicename, $scope.usertype);
            };
            $scope.goToNext = function(){
                Pagination.goToNext($scope.controlleras.list, $scope.servicename, $scope.usertype);
            }
        }

    }
}
