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
              '+spaceship.cardImage(product.name)+'\
              </div>\
            </div>'
  },
  cardImage: function(name) {
    var images = {
      "Twin Ion Engine Starfighter": "http://vignette3.wikia.nocookie.net/starwarsrebels/images/d/de/The_Inquisitors_TIE_Fighter_2.png/revision/latest?cb=20161014095947",
      "T-65 X-wing Starfighter": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image",
      "Y-wing Starfighter": "http://vignette3.wikia.nocookie.net/starwarsrebels/images/d/de/The_Inquisitors_TIE_Fighter_2.png/revision/latest?cb=20161014095947",
      "YT-1300 Light Freighter": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image",
      "Alpha-class Xg-1 Star Wing": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image",
      "Lambda-class T-4a shuttle": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image",
      "RZ-1 A-wing interceptor": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image",
      "B-wing heavy assault starfighter": "https://dp1eoqdp1qht7.cloudfront.net/community/migrated/827/6f2/86394/image"
    }
    return images[name];
  }
}
