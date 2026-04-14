from microbit import *

while True:
    if accelerometer.was_gesture("shake"):
        display.show(Image.GHOST)
        sleep(1000)
        display.clear()
