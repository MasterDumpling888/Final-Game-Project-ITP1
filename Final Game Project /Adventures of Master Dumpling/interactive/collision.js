function collisionDetection(player, obj) {
	if (["Platforms", "MovingPlat", "CollapsingPlat", "Ground"].includes(obj.constructor.name)) {
		if (player.pos.x > obj.x - blockSize / 2 && player.pos.x + blockSize / 2 < obj.x + obj.w) {
			const v = obj.y - player.pos.y;
			if (v < 64 && v >= 0) {
				return true;
			} else {
				return false;
			}
		}
	} else if (["Enemy", "Sumo", "Ninja", "Orb"].includes(obj.constructor.name)) {
		let d = dist(player.pos.x + blockSize / 2, player.pos.y + blockSize / 2, obj.x, obj.y);
		if (d < 40) {
			return true;
		} else {
			return false;
		}
	} else if (["Checkpoint"].includes(obj.constructor.name)){
		let d = abs(player.pos.x - (obj.x + 150));
    	if(d < 150){
      	return true;
    	} else {
			return false;
		}
	} else {
		return false;
	}
}