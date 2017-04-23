$(function() {
  spaceship.getData();
})

$(document).on('click', '.ship-btn', function(e){
  e.preventDefault()
  var self = $(this),
  product = self.data("product");
  $('.ship-name').html(product.name);
  $('.ship-mfg').html(product.manufacturer);
  $('.ship-class').html(product.class);
  $('.info-image img').attr("src", spaceship.cardImage(product.name));
  if (product.price != undefined) {
    $('.ship-price').html(product.price);
    }
  $(".techspecs-left, .techspecs-right").html("");
  var i = 0;
  for(a in product.techspecs){
    var techSpecsClass = (i > 3) ? ".techspecs-right" : ".techspecs-left";
    $(techSpecsClass).append(spaceship.techSpecs(a, product.techspecs))
    i = i+1;
  }
  setTimeout(function(){
    spaceship.slideAnimation("105%", "-100%")
  })
})

$(document).on('click', '.ship-home', function(e){
  e.preventDefault()
  spaceship.slideAnimation("0%", "100%")
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
        $(".ship-tab").append(spaceship.cardHtml(index, activeClass, product))
      })
    })
  },
  cardHtml: function(index, activeClass, product) {
    console.log(product)
    var parseProduct = JSON.stringify(product)
    return "<div role='presentation' class='col-xs-12 col-sm-6 col-md-3 "+activeClass+"'>\
        <div class='ship-card'>\
          <img class='img-responsive card-image' src='"+spaceship.cardImage(product.name)+"'>\
          <div class='overlay'>\
            <p class='name'>"+product.name+"</p>\
            <p class='mfg'>"+product.manufacturer+"</p>\
            <p class='ship-class'>"+product.class+"</p>\
            <a href='#ship_"+index+"' class='btn btn-primary ship-btn' data-product='"+parseProduct+"'>View tech specs</a>\
          </div>\
        </div>\
      </div>";
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
  },
  slideAnimation: function(rightPosition, leftPosition){
    $(".ship-tab").animate({
      right: rightPosition
    }, "slow");
    $(".ship-info-container").animate({
      left: leftPosition
    }, "slow");
  },
  techSpecs: function(a, techspecs){
    return '<div class="media">\
      <div class="media-left media-middle">\
        <i class="fa fa-industry"></i>\
      </div>\
      <div class="media-body media-middle">\
          <p class="no-margin font-16">'+ a +':</p>\
          <strong class="font-20 s-armament">'+techspecs[a]+'</strong>\
      </div>\
    </div>'
  }
}
