#include "MicroBit.h"

MicroBit uBit;

void onButtonA(MicroBitEvent) {
    uBit.display.scroll("A");
}

int main() {
    uBit.init();
    uBit.messageBus.listen(MICROBIT_ID_BUTTON_A, MICROBIT_BUTTON_EVT_CLICK, onButtonA);

    release_fiber();
}
