// Sketch for the LCD display portion of BenTogether Interactive Lunchbox
// Displays the number of points the child has and time remaining in lunch on the lunchbox's embedded screen

#include <Wire.h>
#include <LCD.h>
#include <LiquidCrystal_I2C.h>

#define En_pin 2
#define Rw_pin 1
#define Rs_pin 0
#define D4_pin 4
#define D5_pin 5
#define D6_pin 6
#define D7_pin 7

int n = 1800; // seconds remaining
int points = 0;

LiquidCrystal_I2C lcd(0x3F, 2, 1, 0, 4, 5, 6, 7);

void setup() {
    lcd.begin(16, 2); // 16x2 LCD
 
    lcd.setBacklightPin(3, POSITIVE); // backlight on pin 3
    lcd.setBacklight(HIGH);
    lcd.home();
}

void loop() {
  // print the number of points
  lcd.setCursor(0, 0);
  lcd.print("POINTS: ");
  lcd.setCursor(0, 8);
  lcd.print(points);

  // print the time remaining
  lcd.setCursor(0, 1);
  lcd.print("TIME: ");
  lcd.print(n / 60);
  lcd.print(":");
  if (n - ((n / 60) * 60) < 10) {
    lcd.print("0");
  }
  lcd.print(n - ((n / 60) * 60));
  n--;
  delay(1000);
}
