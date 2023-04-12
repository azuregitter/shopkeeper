// =================================================================== //
// ==========		Plugin Provided by ShadowDragon			========== //
// ==========           ShadowDragon Mouse Hover     	    ========== //
// =================================================================== //
/** /*:
*
* @author ShadowDragon
* @plugindesc [Version 0.1][Utility] Mouse Hover in Windows
*
* @help
*
* Use your mouse inside windows as it isn't default.
* As you need to click twice to have the selection open the scene,
* this plugin fix that.
*
* The plugin is plug & play.
*
*
* Terms of Use.
* Credit ShadowDragon
* Do not redistribute the plugin but link back instead. (either forum or itch.io)
* forum: https://forums.rpgmakerweb.com/index.php?members/shadowdragon.130321/
* itch.io: https://shadowdragon-jb.itch.io
*
* DO NOT CHANGE THE HEADER OR TERMS OF USAGE.
* Free to use in any project with proper credits. 
*
* === WARNING ===
* DO NOT REDISTRIBUTE WITHOUT PERMISSION FROM SHADOWDRAGON
* CONTACT: https://forums.rpgmakerweb.com/index.php?members/shadowdragon.130321/
*/
/**
 * @Imported Import plugins list
 */
 var Imported = Imported || {};
     Imported["SDJB_MouseHover"] = true;

/**
 * @SDJB Shortcut for ShadowDragonJB
 */
 var SDJB = SDJB || {};
     SDJB._MH = SDJB._MH || {};

/**
 * @SDJBParam Base parameter settings
 */
     //SDJB._MHParam = SDJB_Check(PluginManager.parameters("SDJB_MouseHover"));


(() => {
    'use strict'


    TouchInput._onMouseMove = function(event) {
        let mouseX = Graphics.pageToCanvasX(event.pageX);
        let mouseY = Graphics.pageToCanvasY(event.pageY);
        this._onMove(mouseX, mouseY);
    };

    const SDJB_MH_WS_u = Window_Selectable.prototype.update;
        Window_Selectable.prototype.update = function() {
            this.MoveMouseCursor();
            SDJB_MH_WS_u.call(this);
        };

    Window_Selectable.prototype.MoveMouseCursor = function() {
        if (this.isOpenAndActive() && TouchInput.isMoved() && this.MouseInsideWindow()) {
            this.onTouch(false);
        }
        if (Utils.isMobileDevice()) this.onTouch(true); // mobile support?
    };

    Window_Selectable.prototype.MouseInsideWindow = function() {
        let mouseX = this.canvasToLocalX(TouchInput.x);
        let mouseY = this.canvasToLocalY(TouchInput.y);
        if (mouseX > this.padding && mouseX <= this.width - this.padding) {
            if (mouseY > this.padding && mouseY < this.height - this.padding) {
                return true;
            }
        }
        return false;
    };

    
  // TODO alter for being pressed instead of hover
    SoundManager._lastCursorSE = 0;

    const SDJB_MH_playCursor = SoundManager.playCursor;
        SoundManager.playCursor = function() {
            let playSE = SoundManager._lastCursorSE > Graphics.frameCount || Graphics.frameCount > SoundManager._lastCursorSE + 10; // 10 = cooldown (when input is pressed)
            if (playSE) {
                SDJB_MH_playCursor.call(this);
                SoundManager._lastCursorSE = Graphics.frameCount;
            }
        };

})();