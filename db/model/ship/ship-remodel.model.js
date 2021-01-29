class RemodelModel {
    constructor({prev, prev_loop, next, next_lvl, next_loop} = {}, {ammo, steel} = {}) {
        this.prev = {};
        this.prev.ship_id = prev || NaN;
        this.prev.have_more_than_one_prev_form = prev_loop || false;

        this.next = {};
        this.next.ship_id = next || NaN;
        this.next.level_request = next_lvl || NaN;
        this.next.have_more_than_one_next_form = next_loop || false;

        this.next.cost = {};
        this.next.cost.ammo = ammo || NaN;
        this.next.cost.steel = steel || NaN;
    }

    static build(remodel = {}, remodelCost = {}) {
        return new RemodelModel(remodel, remodelCost);
    }
}

export {RemodelModel};