#include "MicroBit.h"

MicroBit uBit;

int main() {
    uBit.init();

    while (true) {
        int x = uBit.accelerometer.getX();
        int y = uBit.accelerometer.getY();

        uBit.display.scroll("(" + ManagedString(x) + "," + ManagedString(y) + ")");
        uBit.sleep(200);
    }
}
