$(function() {
  spaceship.getData();
})

$(document).on('click', '.ship-btn', function(e){
  e.preventDefault()
  var self = $(this),
  product = self.data("product");
  $('.info-right .ship-name').html(product.name);
  $('.info-right .ship-mfg').html(product.manufacturer);
  $('.info-right .ship-class').html(product.class);
  $('.info-image img').attr("src", spaceship.cardImage(product.name));
  if (product.price != undefined) {
    $('.ship-price').html(product.price);
    }
  $(".techspecs-col1, .techspecs-col2, .techspecs-col3").html("");
  var i = 0;
  var techspecsLength = Object.keys(product.techspecs).length;
  for(a in product.techspecs){
    if (i < (techspecsLength === 10 ? 4 : 3 )) {
      techSpecsClass = $('.techspecs-col1')
    } else if (i < (techspecsLength === 10 ? 7 : 6 ) ) {
      techSpecsClass = $('.techspecs-col2')
    } else {
      techSpecsClass = $('.techspecs-col3')
    }
    techSpecsClass.append(spaceship.techSpecs(a, product.techspecs))
    i = i+1;
  }
  $('body').animate({ scrollTop: $('.top-header').height() }, 400, function() {});
  setTimeout(function(){
    spaceship.slideAnimation("100%", "0%")
  })
  $(".ship-tab").css({
    "visibility": "hidden",
    "max-height": $(".ship-info-container").innerHeight() + 100,
    "overflow": "hidden"
  })
})

$(document).on('click', '.ship-home', function(e){
  e.preventDefault()
  $(".ship-tab").css({
    "visibility": "visible",
    "max-height": "auto",
    "overflow": "auto"
  })
  spaceship.slideAnimation("0%", "-100%")
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
        $(".ship-tab").append(spaceship.cardHtml(index, product))
      })
    })
  },
  cardHtml: function(index, product) {
    var parseProduct = JSON.stringify(product)
    return "<div class='col-xs-12 col-sm-6 col-md-4 col-lg-3'>\
        <div class='ship-card'>\
          <img class='img-responsive card-image' src='"+spaceship.cardImage(product.name)+"'>\
          <div class='ship-info'>\
            <p class='name'>"+product.name+"</p>\
            <p class='mfg'><strong> Mfg: </strong> "+product.manufacturer+"</p>\
            <p class='ship-class'><strong> Class: </strong> "+product.class+"</p>\
            <div class='buttons'>\
              <a href='#ship_"+index+"' class='btn btn-primary ship-btn' data-product='"+parseProduct+"'>View specs</a>\
              <a href='#' class='btn btn-primary buy-btn'> Buy Now</a>\
            </div>\
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
        <i class="fa '+spaceship.cardIcon(a)+'"></i>\
      </div>\
      <div class="media-body media-middle">\
          <p class="no-margin font-16">'+ a +':</p>\
          <strong class="font-16 s-armament">'+techspecs[a]+'</strong>\
      </div>\
    </div>'
  },
  cardIcon: function(name) {
    console.log(name)
    var icons = {
      "length": "fa-window-minimize",
      "maxatmosphericspeed": "fa-tachometer",
      "shielding": "fa-shield",
      "maxaccel": "fa-bolt",
      "MGLT": "fa-magic",
      "hull": "fa-space-shuttle",
      "sensor": "fa-wifi",
      "targeting": "fa-bullseye",
      "armament": "fa-bomb",
      "communications": "fa-comments"
    }
    return icons[name];
  }
}
