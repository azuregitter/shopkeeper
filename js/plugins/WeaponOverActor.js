/*:
 * @plugindesc v1.0.1 For sideview battle, change the order in which weapon and actor are drawn.
 * @author LadyBaskerville
 *
 * @help
 * Use the notetag <Weapon Over Actor> in the actor or weapon notebox
 * to draw the weapon image on top of the actor image.
 * Might not work when changing weapons during battle.
 *
 * Free for use in both non-commercial and commercial games.
 * No credit required.
 * Edits and reposts allowed.
 */

Sprite_Actor.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._battlerName = '';
    this._motion = null;
    this._motionCount = 0;
    this._pattern = 0;
	this.createSprites();
};

Sprite_Actor.prototype.createSprites = function() {
	this.createShadowSprite();
	if (this._actor && ($dataActors[this._actor._actorId].meta["Weapon Over Actor"] ||
                        ($dataWeapons[this._actor._equips[0]._itemId] && $dataWeapons[this._actor._equips[0]._itemId].meta["Weapon Over Actor"]))) {
		this.createMainSprite();
		this.createWeaponSprite();
	} else {
		this.createWeaponSprite();
		this.createMainSprite();
	}
	this.createStateSprite();
};

Sprite_Actor.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    var changed = (battler !== this._actor);
    if (changed) {
        this._actor = battler;
        if (battler) {
            this.setActorHome(battler.index());
        }
		this.createSprites();
        this.startEntryMotion();
        this._stateSprite.setup(battler);
    }
};