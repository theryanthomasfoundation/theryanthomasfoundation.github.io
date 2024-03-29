/*
	Tessellate by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			'global': { range: '*', href: 'css/style.css', containers: 1360, grid: { gutters: 50 } },
			'wide': { range: '-1680', href: 'css/style-wide.css', containers: 1200, grid: { gutters: 40 } },
			'normal': { range: '-1280', href: 'css/style-normal.css', containers: 960, grid: { gutters: 30 } },
			'narrow': { range: '-1000', href: 'css/style-narrow.css', containers: '100%!', grid: { gutters: 25, collapse: true } },
			'mobile': { range: '-736', href: 'css/style-mobile.css', grid: { gutters: 20 }, viewport: { scalable: false } }
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');
			
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});
			
		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {

				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});

				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

				// Custom select.
					$form.find('.select select')
						.on('focus', function() {
							$(this).parent().addClass('focus');
						})
						.on('blur', function() {
							$(this).parent().removeClass('focus');
						});						

			}
			
		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Scrolly links.
			$('.scrolly').scrolly();


			// $header = $('#site-header');

			// $(window).on('scroll', function(e) {
			// 	if (window.scrollY > 200) {
			// 		$header.addClass('stuck');
			// 	} else {
			// 		$header.removeClass('stuck');
			// 	}
			// });


			var $selectTemplate = $('#shirt-size-dropdown-template').text();
			var $fieldTemplate = $('#shirt-size-input-template').text();

			var $selectContainer = $form.find('#shirt-size-inputs');
			var $fieldContainer = $form.find('#shirt-size-fields');
			

			$form.find('#event-option').on('change', function(e) {

				var shirtmap = {
					'food_only': 0,
					'hole_sponsor': 1,
					'single_player': 1,
					'foursome_and_hole_sponsor': 4,
					'foursome': 4
				};

				var selectedOption = e.currentTarget.value;
				var numberOfShirts = shirtmap[selectedOption];

				$selectContainer.empty();
				$fieldContainer.empty();

				if (numberOfShirts) {

					for (var i = 4; i < numberOfShirts+4; i++ ) {
						$fieldContainer.append($fieldTemplate.replace(/{{x}}/g, i).replace(/{{label}}/g, i - 3));
						$selectContainer.append($selectTemplate.replace(/{{x}}/g, i).replace(/{{label}}/g, i - 3));
					}

				}

			});

	});

})(jQuery);