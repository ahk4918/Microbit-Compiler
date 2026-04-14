#include "MicroBit.h"

MicroBit uBit;

int main() {
    uBit.init();

    while (true) {
        uBit.display.print("*");
        uBit.sleep(500);
        uBit.display.clear();
        uBit.sleep(500);
    }
}
