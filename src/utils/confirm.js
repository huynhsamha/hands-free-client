export function success(content, cb = () => {}) {
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

export function error(content, cb = () => {}) {
  $.confirm({
    title: 'Lỗi',
    icon: 'fa fa-exclamation-triangle',
    type: 'red',
    content,
    buttons: {
      ok: {
        text: 'OK',
        btnClass: 'btn-red',
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
        btnClass: 'btn-red',
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

export function warningConfirm(content, btnOK, btnCancel, onOK = () => {}, onCancel = () => {}) {
  $.confirm({
    title: 'Thông báo',
    icon: 'fa fa-question-circle',
    type: 'orange',
    content,
    buttons: {
      ok: {
        text: btnOK,
        btnClass: 'btn-orange',
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
