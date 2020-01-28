   /**
     * Makecode Extension for sharpGP2Y1010AU0F Dustsensor
     * Original Code by ElecFreaks
     * For use with the Dustsensors from ElecFreaks or DFRobot
     * Have fun ...
     */

//% weight=10 color=#2E2E2E icon="\uf0c2"
//% block="sharpGP2Y1010AU0F"

namespace sharpGP2Y1010AU0F {

    let Reference_VOLTAGE = 3100

    /**
     * get dust value (μg/m³) 
     * @param vLED describe parameter here, eg: DigitalPin.P0
     * @param vo describe parameter here, eg: AnalogPin.P1
     */
    //% blockId="readdust" block="value of dust(μg/m³) at LED %vLED| out %vo"
    export function ReadDust(vLED: DigitalPin, vo: AnalogPin): number {
        let voltage = 0;
        let dust = 0;
        pins.digitalWritePin(vLED, 0);
        control.waitMicros(160);
        voltage = pins.analogReadPin(vo);
        control.waitMicros(100);
        pins.digitalWritePin(vLED, 1);
        voltage = pins.map(
            voltage,
            0,
            1023,
            0,
            Reference_VOLTAGE / 2 * 3
        );
        dust = (voltage - 380) * 5 / 29;
        if (dust < 0) {
            dust = 0
        }
        return Math.round(dust)
    }
}
