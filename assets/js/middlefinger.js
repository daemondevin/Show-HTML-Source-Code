/**
 * JavaScript file for the MODX middleFinger extra
 *
 * Copyright 2016 by demon.devin <demon.devin@gmail.com>
 * Created on 12-03-2016
 *
 * middleFinger is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * middleFinger is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * middleFinger; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 * @package middlefinger
 */

'use strict';

var html = document.documentElement;
var ctxMenu = document.querySelector('.menu:not(.sublet)');
var ctxMenuOpen = false;
var ctxItemSelected;

ctxMenu.addEventListener('animationend', function () {
	ctxMenu.classList.remove('move');
});

function ctxMenuOpen() {
	ctxMenuOpen = true;
	ctxMenu.hidden = false;
}

function ctxMenuClose() {
	ctxMenu.hidden = true;
	ctxMenuOpen = false;
}

document.addEventListener('contextmenu', function (e) {

	if (ctxMenuOpen)
		ctxMenu.classList.add('move');

	ctxMenuOpen = true;
	ctxMenu.hidden = false;

	var sijX = e.clientX;
	var sijY = e.clientY;

	if (sijX + ctxMenu.offsetWidth > html.clientWidth)
		sijX -= ctxMenu.offsetWidth;

	if (sijY + ctxMenu.offsetHeight > html.clientHeight)
		sijY -= ctxMenu.offsetHeight;

	ctxMenu.style.left = Math.max(sijX, 0) + 'px';
	ctxMenu.style.top = Math.max(sijY, 0) + 'px';

	e.preventDefault();
});

document.addEventListener('keydown', function (event) {
	if (event.defaultPrevented) {
		return;
	}
	if (ctxMenuOpen) {
		switch (event.code) {
		case "ContextMenu":
		case "Escape":
			ctxMenuClose();
			break;
		case "Home":
			window.location.assign('http://' + location.host + '/');
			break;
		case "F5":
		case "F5":
			window.location.reload(true);
			break;
		case "Backspace":
			window.history.go(-1);
			break;
		case "ShiftLeft" && "Backspace":
		case "ShiftRight" && "Backspace":
			window.history.forward();
			break;
		case "ControlLeft" && "KeyU":
		case "ControlRight" && "KeyU":
			var z;
			var viewSourceLink = void(z = document.body.appendChild(document.createElement('script')));void(z.language = 'javascript');void(z.type = 'text/javascript');void(z.src = '/Source.php?p=' + location.href);
			window.location.assign('javascript:' + viewSourceLink);
			break;
		}
	} else if (ctxMenuOpen == false) {
		switch (event.code) {
		case "ContextMenu":
			ctxMenuOpen();
			break;
		case "F5":
		case "F5":
			window.location.reload(true);
			break;
		case "Backspace":
			window.history.go(-1);
			break;
		case "ShiftLeft" && "Backspace":
		case "ShiftRight" && "Backspace":
			window.history.forward();
			break;
		case "ControlLeft" && "KeyU":
		case "ControlRight" && "KeyU":
			var z;
			var viewSourceLink = void(z = document.body.appendChild(document.createElement('script')));void(z.language = 'javascript');void(z.type = 'text/javascript');void(z.src = '/Source.php?p=' + location.href);
			window.location.assign('javascript:' + viewSourceLink);
			break;
		}
	}
	switch (event.code) {
		case "ControlLeft" && "KeyX":
		case "ControlRight" && "KeyX":
			closeSourceWindow();
			break;
	}
	event.preventDefault();
}, true);

document.addEventListener('click', ctxMenuClose);
window.addEventListener('blur', ctxMenuClose);
window.addEventListener('resize', ctxMenuClose);

function cancelScroll(e) {
	if (ctxMenuOpen)
		e.preventDefault();
}

document.addEventListener('scroll', cancelScroll);
window.addEventListener('wheel', cancelScroll, {passive:true});

ctxMenu.addEventListener('mousemove', function (e) {
	if (e.target.matches('li')) {
		e.target.classList.add('.item:not(.item--disabled):hover');
		ctxItemSelected = e.target;
	}
});

ctxMenu.addEventListener('mouseout', function (e) {
	if (ctxItemSelected) {
		ctxItemSelected.classList.remove('.item:not(.item--disabled):hover');
		ctxItemSelected = null;
	}
});

window.addEventListener('keydown', function (e) {
	if (ctxMenuOpen && (e.keyCode === 40 || e.keyCode === 38)) {
		var zzz = (e.keyCode === 40)
		 ? (ctxItemSelected && !e.altKey ? ctxItemSelected.nextElementSibling : ctxMenu.firstElementChild)
		 : (ctxItemSelected && !e.altKey ? ctxItemSelected.previousElementSibling : ctxMenu.lastElementChild);

		if (zzz) {
			if (ctxItemSelected)
				ctxItemSelected.classList.remove('.item:not(.item--disabled):hover');
			zzz.classList.add('.item:not(.item--disabled):hover');
			ctxItemSelected = zzz;
		}
	} else if (ctxItemSelected && (e.keyCode === 13 || e.keyCode === 32)) {
		ctxMenuClose();
	}
});
