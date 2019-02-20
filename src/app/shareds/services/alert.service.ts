import { Injectable } from '@angular/core';
declare const $: any;
declare const swal: any;
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // แจ้งเตือน Defualt Function
  notify(message: string, type: string = 'warning') {
    $.notify({
      // options
      title: 'แจ้งเตือน : ',
      message: message,
      //url: 'https://github.com/mouse0270/bootstrap-notify',
      //target: '_blank'
    }, {
        // settings
        element: 'body',
        position: null,
        type: type,
        allow_dismiss: true,
        newest_on_top: true,
        showProgressbar: false,
        placement: {
          from: "top",
          align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
          enter: 'animated fadeInDown',
          exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

  // แจ้งเตือน ถ้าเกิดข้อผิดพลาด
  someting_wrong(message: string = 'ข้อมูลบางอย่างไม่ถูกต้อง กรุณาลองอีกครั้ง') {
    this.notify(message);
  }

  // แจ้งเตือน ยืนยันการทำรายการ
  confirm(messageAlert: string = 'คุณต้องการทำรายการต่อไปหรือไม่'): Promise<any> {
    return swal({
      //title: messageAlert,
      text: messageAlert,
      //icon: "warning",
      buttons: ["ยกเลิก", "ยืนยัน"],
      dangerMode: true
    })
    /*.then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });*/
  }
}
