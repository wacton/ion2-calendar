import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CalendarModal } from "./components/calendar.modal";
import { CalendarService } from './services/calendar.service';
var CalendarController = (function () {
    function CalendarController(modalCtrl, calSvc) {
        this.modalCtrl = modalCtrl;
        this.calSvc = calSvc;
    }
    CalendarController.prototype.openCalendar = function (calendarOptions, modalOptions) {
        var _this = this;
        if (modalOptions === void 0) { modalOptions = {}; }
        var options = this.calSvc.safeOpt(calendarOptions);
        var calendarModal = this.modalCtrl.create(CalendarModal, Object.assign({
            options: options,
        }, options), modalOptions);
        calendarModal.present();
        return new Promise(function (resolve, reject) {
            calendarModal.onDidDismiss(function (data) {
                if (data && Array.isArray(data)) {
                    resolve(_this.calSvc.wrapResult(data, options.pickMode));
                }
                else {
                    reject('cancelled');
                }
            });
        });
    };
    CalendarController.prototype.setHistory = function (param) {
        localStorage.setItem("ion-calendar-" + param.id, JSON.stringify(param.date));
    };
    CalendarController.prototype.getHistory = function (id) {
        var _history = localStorage.getItem("ion-calendar-" + id);
        if (_history) {
            return JSON.parse(_history);
        }
    };
    CalendarController.prototype.removeHistory = function (id) {
        localStorage.removeItem("ion-calendar-" + id);
    };
    return CalendarController;
}());
export { CalendarController };
CalendarController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CalendarController.ctorParameters = function () { return [
    { type: ModalController, },
    { type: CalendarService, },
]; };
//# sourceMappingURL=calendar.controller.js.map