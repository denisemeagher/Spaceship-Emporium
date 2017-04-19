$(function() {
  spaceship.getData();
})

var spaceship = {
  getData: function() {
    $.ajax({
      method: "GET",
      url: "http://demo7475333.mockable.io/spaceships",
      dataType: "JSON"
    })
    .done(function(data){
      var products = data.products;
      $.each(products,function(index, product){
        var activeClass = index === 0 ? "active" : "";
        $(".ship-tab").append(spaceship.cardTabHtml(index, activeClass, product))
        $(".ship-content").append(spaceship.cardContentHtml(index, activeClass, product))
      })
    })
  },
  cardTabHtml: function(index, activeClass, product) {
    console.log(product)
    return '<li role="presentation" class="col-md-4 col-lg-3 '+activeClass+'">\
        <div class="ship-card">\
          <img class="img-responsive card-image" src="'+spaceship.cardImage(product.name)+'">\
          <p class="name">'+product.name+'</p>\
          <p class="mfg">'+product.manufacturer+'</p>\
          <p class="ship-class">'+product.class+'</p>\
          <a href="#ship_'+index+'" role="tab" data-toggle="tab">View more details</a>\
        </div>\
      </li>';
  },
  cardContentHtml: function(index, activeClass, product) {
    var techSpecs = product.techspecs;
    return '<div role="tabpanel" class="tab-pane col-xs-12 '+activeClass+'" id="ship_'+index+'">\
              <div class="ship-info">\
              <img class="img-responsive card-image" src="'+spaceship.cardImage(product.name)+'">\
              </div>\
            </div>'
  },
  cardImage: function(name) {
    var images = {
      "Twin Ion Engine Starfighter": "images/ship1.png",
      "T-65 X-wing Starfighter": "images/ship2.png",
      "Y-wing Starfighter": "images/ship3.png",
      "YT-1300 Light Freighter": "images/ship4.png",
      "Alpha-class Xg-1 Star Wing": "images/ship5.png",
      "Lambda-class T-4a shuttle": "images/ship6.png",
      "RZ-1 A-wing interceptor": "images/ship7.png",
      "B-wing heavy assault starfighter": "images/ship8.png"
    }
    return images[name];
  }
}
