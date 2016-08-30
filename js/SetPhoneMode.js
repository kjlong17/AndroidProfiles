var version = '0.0.1';
setGlobal('PHONEMODEVERSION', version);

var modeConfig = JSON.parse(readFile(global('MODECONFIGPATH') + '/' + global('PHONEMODE') + '.json'));

if (global('PREVIOUSPHONEMODE') && global('PREVIOUSPHONEMODE') !== global('PHONEMODE')) {
  var exitModeConfig = JSON.parse(readFile(global('MODECONFIGPATH') + '/' + global('PREVIOUSPHONEMODE') + '.json'));

  if (exitModeConfig.exit.profilesToDisable.length > 0) {
    for (var ed = 0; ed < exitModeConfig.exit.profilesToDisable.length; ed++) {
      enableProfile(exitModeConfig.exit.profilesToDisable[ed], false);
      wait(1000);
    }
  }

  if (exitModeConfig.exit.profilesToEnable.length > 0) {
    for (var ee = 0; ee < exitModeConfig.exit.profilesToEnable.length; ee++) {
      enableProfile(exitModeConfig.exit.profilesToEnable[ee], true);
      wait(1000);
    }
  }

  if (exitModeConfig.exit.tasksToRun.length > 0) {
    for (var et = 0; et < exitModeConfig.exit.tasksToRun.length; et++) {
      performTask(exitModeConfig.exit.tasksToRun[et].name, exitModeConfig.exit.tasksToRun[et].priority, exitModeConfig.exit.tasksToRun[et].param1, exitModeConfig.exit.tasksToRun[et].param2);
      wait(500);
    }
  }
}

if (modeConfig.enter.profilesToDisable.length > 0) {
  for (var d = 0; d < modeConfig.enter.profilesToDisable.length; d++) {
    enableProfile(modeConfig.enter.profilesToDisable[d], false);
    wait(1000);
  }
}

if (modeConfig.enter.profilesToEnable.length > 0) {
  for (var e = 0; e < modeConfig.enter.profilesToEnable.length; e++) {
    enableProfile(modeConfig.enter.profilesToEnable[e], true);
    wait(1000);
  }
}

//  1. GPS
if (modeConfig.locationMode !== null) { performTask('LocationMode', 10, modeConfig.locationMode, ''); }

/*
// 2. BLUETOOTH
if (modeConfig.net.bluetoothOn !== null) { setBT(modeConfig.bluetoothOn); }
// 3. WI-FI
if (modeConfig.net.wifiOn !== null) { setWifi(modeConfig.net.wifiOn); }
// 4. DATA-SYNC
if (modeConfig.net.dataSync !== null) { setAutoSync(modeConfig.net.dataSync); }

// 5. DISPLAY TIMEOUT
if (modeConfig.screen.timeout !== null) { displayTimeout(modeConfig.screen.timeout); }

// 6. ALARM VOLUME
if (Number.isInteger(modeConfig.volume.alarm)) { alarmVol(modeConfig.volume.alarm, false, false); }
// 7. MEDIA VOLUME
if (Number.isInteger(modeConfig.volume.media)) { mediaVol(modeConfig.volume.media, false, false); }
// 8. RINGTONE VOLMUME
if (Number.isInteger(modeConfig.volume.ringer)) { ringerVol(modeConfig.volume.ringer, false, false); }
// 9. NOTIFICATION VOLUME
if (Number.isInteger(modeConfig.volume.notification)) { notificationVol(modeConfig.volume.notification, false, false); }

// 10. DISPLAY BRIGHTNESS
if (Number.isInteger(modeConfig.screen.brightness)) { performTask('DisplayBrightness', 10, modeConfig.screen.brightness, ''); }
// 11. AUTO-BRIGHTNESS
if (modeConfig.screen.autoBright !== null) { displayAutoBright(modeConfig.screen.autoBright); }
// 12. SCREEN ROTATION
if (modeConfig.screen.screenRotationOn !== null) { performTask('DisplayRotate', 10, modeConfig.screen.screenRotationOn, ''); }
// 13. DO NOT DISTURB
if (modeConfig.volume.dnd !== null) { performTask('DoNotDisturb', 10, modeConfig.volume.dnd, ''); }
// 14. MOBILE DATA
if (modeConfig.net.mobileData !== null) { performTask('MobileData', 10, modeConfig.net.mobileData, ''); }
*/

if (modeConfig.enter.tasksToRun.length > 0) {
  for (var t = 0; t < modeConfig.enter.tasksToRun.length; t++) {
    performTask(modeConfig.enter.tasksToRun[t].name, modeConfig.enter.tasksToRun[t].priority, modeConfig.enter.tasksToRun[t].param1, modeConfig.enter.tasksToRun[t].param2);
    wait(100);
  }
}

flash(global('PHONEMODE') + ' mode enabled');
setGlobal('PREVIOUSPHONEMODE', global('PHONEMODE'));
