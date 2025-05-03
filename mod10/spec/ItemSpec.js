describe('ValidateItem', function () {
  var MenuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      MenuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return categories list', function() {
    var menuItem = 'L1';
    var expectResponse = { name:'Orange Chicken', short_name: 'L1' };

    $httpBackend.whenGET(ApiBasePath + '/menu_items/L/menu_items/0.json').respond(['Lunch', 'Dessert']);
    MenuService.getMenuItem(menuItem).then(function(response) {
      expect(response.name).toEqual(expectResponse.name);
      expect(response.short_name).toEqual(expectResponse.short_name);
    });
    $httpBackend.flush();
  });
});
