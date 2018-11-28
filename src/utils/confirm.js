export function success(content, cb) {
  $.confirm({
    title: 'Thông báo',
    icon: 'fa fa-bell',
    type: 'green',
    content,
    buttons: {
      ok: {
        text: 'OK',
        btnClass: 'btn-green',
        action() {
          cb();
        }
      }
    }
  });
}

export function successConfirm(content, btnOK, btnCancel, onOK = () => {}, onCancel = () => {}) {
  $.confirm({
    title: 'Thông báo',
    icon: 'fa fa-bell',
    type: 'green',
    content,
    buttons: {
      ok: {
        text: btnOK,
        btnClass: 'btn-green',
        action() {
          onOK();
        }
      },
      cancel: {
        text: btnCancel,
        action() {
          onCancel();
        }
      }
    }
  });
}

export function dangerConfirm(content, btnOK, btnCancel, onOK = () => {}, onCancel = () => {}) {
  $.confirm({
    title: 'Cảnh báo',
    icon: 'fa fa-exclamation-triangle',
    type: 'red',
    content,
    buttons: {
      ok: {
        text: btnOK,
        btnClass: 'btn-danger',
        action() {
          onOK();
        }
      },
      cancel: {
        text: btnCancel,
        action() {
          onCancel();
        }
      }
    }
  });
}
