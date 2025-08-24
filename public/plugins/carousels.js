/**
 * OwlCarousel 2 - Filter
 * @author Bear
 * @version 1.0
 * 
 */

;( function( root, factory ) {

    if( typeof exports === "object" ) {
        module.exports = factory( root.jQuery )
    } else {
        root.owlcarousel2_filter = factory( root.jQuery );
    }
} ) ( window, function( $, args ) {
    'use strict';
    var OwlCarousel2_Filter = function( filter, $args ) {

        var owl = this;
        var owl_object = owl.data( 'owl.carousel' );
        var owl_settings = owl_object.settings;

        // Destroy OwlCarousel 
        owl.trigger( 'destroy.owl.carousel' );
        
        // Clone
        if( ! owl.oc2_filter_clone ) {
            owl.oc2_filter_clone = owl.clone();
        }           
                
        // Filter elements and clone
        var clone_filter_items = owl.oc2_filter_clone.children( filter ).clone();

        if($args) {
            clone_filter_items.addClass('owl-loading');            
        }             
        
        owl.empty().append( clone_filter_items ).owlCarousel( owl_settings );

        if($args){
            if(owl_settings.loop) {
                var $anim_items = owl.find('.owl-item.active .owl-animate');
                owl.find('.owl-item:not(.active) .owl-animate').removeClass('owl-loading');
                $anim_items.each(function(){ return owlAnimateFilter($(this), $anim_items); });                
            } else {
                clone_filter_items.each(function(){ return owlAnimateFilter($(this), clone_filter_items); }); 
            }
        }
    }

    var owlAnimateFilter = function($elm, $items) {        
        $elm
        .delay(50 * $items.index($elm))
        .queue(function() {
            $elm.dequeue().removeClass('owl-loading')
        })
    };
    $.fn.owlcarousel2_filter = OwlCarousel2_Filter;

} );

$(function() { 
    var $window = $(window);

    $('.owl-carousel:not(.ignore)').each(function(){
        var $owl = $(this).addClass('owl-init'),
            $owl_flex_cont = $owl.closest('.owl-flex-cont'),
            autowidth    = $(this).data('owl-autowidth') || false,
            $owl_filter  = ($(this).data('owl-filter')) ? $( $(this).data('owl-filter') + ' [data-owl-filtering-item]' ) : null,
            $owl_current = $( $(this).data('owl-filter') + ' [data-owl-filtering-current]' ),
            owl_dots     = $(this).data('owl-dots') || '',
            respo        = {};
        
        $owl.owlCarousel({
            center: false,
            items: $(this).data('owl-show'), 
            loop: $(this).data('owl-infinite') || false,
            margin:0, 
            startPosition: 0,            
            autoWidth: true,
            mouseDrag: false,            
            dots: (owl_dots.length) ? true : false,
            dotsContainer: owl_dots,
            doubleclone: $(this).data('owl-infinite') || false, 
            rewind: $(this).data('owl-infinite') || false, 
            nav: $(this).data('owl-nav') || true,
            navText: ['<svg class="sico"><use xlink:href="./public/icons.svg#s_a_l"/></svg>',
                      '<svg class="sico"><use xlink:href="./public/icons.svg#s_a_r"/></svg>'],
            onRefreshed: function(e){
                if(autowidth) {
                    stage = $('.owl-stage', $owl);
                    stage.width('auto');
                }
            },
            onInitialize: function(){
                $owl_flex_cont.addClass('ready');
            }     
        });  
        
        if($owl.data('owl-slideby-tablet')) {
            var changed = false;
            if(~WINsize.indexOf('tablet')) {                    
                $owl.data('owl.carousel').options.slideBy = $owl.data('owl-slideby-tablet'); 
                $owl.trigger('refresh.owl.carousel');                    
                changed = true;                    
            } 
            $window.on('resize', function(){                
                if(~WINsize.indexOf('tablet')) {                    
                    if(!changed) {
                        $owl.data('owl.carousel').options.slideBy = $owl.data('owl-slideby-tablet'); 
                        $owl.trigger('refresh.owl.carousel');                    
                        changed = true; 
                    }                    
                } else {
                    if(changed) {
                        $owl.data('owl.carousel').options.slideBy = 1; 
                        $owl.trigger('refresh.owl.carousel');      
                        changed = false;  
                    }
                }                  
            });    
        }

        if($owl_filter){
            if($owl.hasClass('only-c-owl1')) {
                $owl.owlcarousel2_filter( '.c-owl1', false );    
            }
         
            $owl_filter.on('click', function(e){
                e.preventDefault();
                var $this = $(this);
                if(!$this.hasClass('sactive')){
                    $owl_filter.removeClass('sactive');
                    $this.addClass('sactive');
                    $owl_current.html( $this.data('owl-filtering-name') || $this.html() );

                    $owl.owlcarousel2_filter( $this.data('owl-filtering-item'), true );
                    window.fns.trigger(';mouseup.clicker');
                }
            });       
        
        }
    });

    //IMAGE SLIDER
    $('.slider_image:not(.ignore)').each(function(){
        var $slider = $(this),
            $par    = $slider.closest('.slider_image_cont'),
            $dots   = $par.find('.slider_image_dots'),
            prependdot = $slider.data('slick-prependdot') || '';
        
        $slider.slick({
            dots: !!$dots.length, 
            infinite: true,
            autoplay: false,   
            slidesToShow: 1,
            draggable:false,
            speed: 700,
            fade: true,
            arrows: false,
            touchMove: false,
            appendDots: $dots,
            customPaging: function(slider, i) {
                return $('<button type="button" />').html(prependdot + "<span>"+(i + 1)+"</span>");
            }
        });  
    }); 
});