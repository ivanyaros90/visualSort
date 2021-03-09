class Ship{
  constructor(size,weapon_slots,module_slots,armor_slots,hp,armor,armor_hp,energy,batteries){
    this._size=size;
    this._weapon_slots=weapon_slots;
    this._module_slots=module_slots;
    this._armor_slots=armor_slots;
    this._hp=hp;
    this._armor=armor;
    this._armor_hp=armor_hp;
    this._energy=energy;
    this._batteries=batteries;    
  }
  calculateStats(){

  }
}
class Corvette extends Ship{
  constructor()

}