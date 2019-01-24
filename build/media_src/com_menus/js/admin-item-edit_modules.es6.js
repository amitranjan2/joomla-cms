/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

Joomla = window.Joomla || {};

(() => {
  'use strict';

  const options = Joomla.getOptions('menus-edit-modules');

  if (options) {
    window.viewLevels = options.viewLevels;
    window.menuId = parseInt(options.itemId, 10);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const baseLink = 'index.php?option=com_modules&amp;client_id=0&task=module.edit&tmpl=component&view=module&layout=modal&id=';
    const assigned1 = document.getElementById('jform_toggle_modules_assigned1');
    const assigned0 = document.getElementById('jform_toggle_modules_assigned0');
    const published1 = document.getElementById('jform_toggle_modules_published1');
    const published0 = document.getElementById('jform_toggle_modules_published0');
    const linkElements = [].slice.call(document.getElementsByClassName('module-edit-link'));
    const elements = [].slice.call(document.querySelectorAll('#moduleEditModal .modal-footer .btn'));

    if (assigned1) {
      assigned1.addEventListener('click', () => {
        const list = [].slice.call(document.querySelectorAll('tr.no'));

        list.forEach((item) => {
          item.style.display = 'table-row';
        });
      });
    }

    if (assigned0) {
      assigned0.addEventListener('click', () => {
        const list = [].slice.call(document.querySelectorAll('tr.no'));

        list.forEach((item) => {
          item.style.display = 'none';
        });
      });
    }

    if (published1) {
      published1.addEventListener('click', () => {
        const list = [].slice.call(document.querySelectorAll('.table tr.unpublished'));

        list.forEach((item) => {
          item.style.display = 'table-row';
        });
      });
    }

    if (published0) {
      published0.addEventListener('click', () => {
        const list = [].slice.call(document.querySelectorAll('.table tr.unpublished'));

        list.forEach((item) => {
          item.style.display = 'none';
        });
      });
    }

    if (linkElements.length) {
      linkElements.forEach((linkElement) => {
        linkElement.addEventListener('click', (event) => {
          const link = baseLink + event.target.getAttribute('data-module-id');
          const modal = document.getElementById('moduleEditModal');
          const body = modal.querySelector('.modal-body');
          const iFrame = document.createElement('iframe');

          iFrame.src = link;
          iFrame.setAttribute('class', 'class="iframe jviewport-height70"');
          body.innerHTML = '';
          body.appendChild(iFrame);

          modal.open();
        });
      });
    }

    if (elements.length) {
      elements.forEach((element) => {
        element.addEventListener('click', (event) => {
          const target = event.target.getAttribute('data-target');

          if (target) {
            const iframe = document.querySelector('#moduleEditModal iframe');
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            iframeDocument.querySelector(target).click();
          }
        });
      });
    }
  });
})();