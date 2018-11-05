export default {
    Calculate: function (val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
            if (val / 10000) {
                return "" + parseInt(val / 10000) + "万";
            } else {
                return val
            }
        } else {
            return "";
        }
    }
}