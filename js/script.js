new Vue({
	el: "#app",
	data: {
		championImage: 'image/hero.jpeg',
		critical: true,
		choice: [
			{"choice": true},
			{"choice": false},
			{"choice": false}
		],
		showDmg: true,
		name: "",
		see: true,
		show: true,
		specialization: "",
		skill1: 'image/attackIcon.png',
		skill2: 'image/strongAttack.png',
		skill3: 'image/healIcon.png',

		// player bar
		genPercentPlayerHp: 0,
		genPercentPlayerMana: 0,
		percentPlayerHp: 100,
		percentPlayerMana: 100,
		playerHealth: 0,
		playerMana: 0,
		// monster bar
		monsterMana: 100,
		monsterHealth: 100,
		showControls: true,
		playerSmallAttackDmg: 0,
		monsterSmallAttackDmg: 0,
		specialPlayerAttack: 20,
		specialMonsterAttack: 20,
		isDisabled: false,
		champions: [
			//basic
			{
			playerHealth: 100, 
			playerMana: 100, 
			image:'image/hero.jpeg', 
			specialPlayerAttack: 40,
			firstSkill:'image/icon11.png',
			secondSkill:'image/icon12.png',
			thirdSkill:'image/icon13.png',
		},
			// mage
			{
				playerHealth: 150, 
				playerMana: 50, 
				image:'image/mage.jpg', 
				specialPlayerAttack: 40,
				firstSkill:'image/icon5.png',
				secondSkill:'image/icon6.png',
				thirdSkill:'image/icon13.png',
			},
			// fireWoman
			{
			playerHealth: 75, 
			playerMana: 200, 
			image:'image/fireWoman.jpg', 
			specialPlayerAttack: 30, 
			firstSkill:'image/icon1.png',
			secondSkill:'image/icon2.png',
			thirdSkill:'image/icon4.png',
			}
		]
	},
	methods: {
		startingGame: function () {
			if(this.name == "") {
				alert("Введи имя дебила кусок");
			} else {
				this.show = !this.show;
				this.layerSmallAttackDmg = 0,
				this.monsterSmallAttackDmg = 0
			}
			
		},

		playerAttack(attack) {
			this.monsterHealth -= attack;
			if (this.monsterHealth <= 0) {
				this.finishGame();
			} else {
				this.monsterSmallAttack();
			}
		},
		playerSmallAttack: function () {
			let max = 30;
			let min = 10;
			this.playerSmallAttackDmg = Math.max(Math.floor(Math.random() * max) + 1, min);
			this.playerAttack(this.playerSmallAttackDmg);
		},
		bigAttackPlayer: function () {
			if(this.playerMana >= 20) {
				this.playerMana -= 20;
				this.playerAttack(this.specialPlayerAttack);
			} else {
				alert("Недостаточно маны");
			}
		},
		playerHealing: function () {
			if (this.playerMana >= 10) {
				this.playerHealth += 30;
				this.playerMana -= 10;
				this.monsterSmallAttack();
			} else {
				alert("Недостаточно маны");
			}
			// if (this.playerHealth >= this.genPercentPlayerHp) {
			// 	this.playerHealth = this.genPercentPlayerHp;
			// }
		},
		monsterAttack(monsterSmallAttackDmg) {
			let vm = this;
			this.isDisabled = !this.isDisabled;
			if (this.monsterSmallAttackDmg > 20) {
				this.critical = !this.critical;
			}
			this.showDmg = !this.showDmg;
			setTimeout(function () {
				if (vm.monsterHealth < 50 && vm.monsterMana >= 50) {
					vm.monsterHealing();
				}
				vm.playerHealth -= vm.monsterSmallAttackDmg;
				// let heal = 2;
				// let hit = 1;
				// let monsterChoice = Math.max(Math.floor(Math.random() * heal) + 1, hit);
				// if (monsterChoice == 1) {
				//     vm.playerHealth -= vm.monsterSmallAttackDmg;
				// } else {
				//     vm.monsterHealth += 10;
				// }
				vm.finishGame();
				vm.isDisabled = !vm.isDisabled;
				vm.showDmg = true;
				vm.critical = true;
			}, 1000);
		},
		monsterSmallAttack: function () {
			let max = 30;
			let min = 20;
			this.monsterSmallAttackDmg = Math.max(Math.floor(Math.random() * max) + 1, min);
			console.log(this.monsterSmallAttackDmg);
			this.monsterAttack(this.monsterSmallAttackDmg);
		},
		monsterHealing: function () {
			this.monsterHealth += 40;
			this.monsterMana -= 50;
			if (this.monsterHealth >= 100) {
				this.monsterHealth = 100;
			}
		},
		finishGame() {
			if (this.playerHealth <= 0) {
				this.playerHealth = 0;
				alert("Monster wins");
				this.show = !this.show;
				this.name = "";
				this.finishGame2();
			} else if (this.monsterHealth <= 0) {
				this.monsterHealth = 0;
				alert("Player wins");
				this.show = !this.show;
				this.name = "";
				this.finishGame2();
			}
		},
		finishGame2() {
			this.playerHealth = 150,
			this.monsterHealth = 100,
			this.playerMana = 200,
			this.monsterMana = 100
		},
		toggleClasses(id) {
		},
		quit() {
			this.show = !this.show;
			this.name = "";
			this.finishGame2();

		},
		choiceHero(id) {
			this.choice.forEach(function (item, index) {
				item.choice = (id === index);
			});
			this.changePlayerData(id);
		},
		changePlayerData(id){
			
			this.playerHealth = this.champions[id].playerHealth;
			this.playerMana = this.champions[id].playerMana;
			this.championImage = this.champions[id].image;
			this.genPercentPlayerHp = this.playerHealth;
			this.genPercentPlayerMana = this.playerMana;
			this.skill1 = this.champions[id].firstSkill;
			this.skill2 = this.champions[id].secondSkill;
			this.skill3 = this.champions[id].thirdSkill;
		},

	},
	computed: {
		
	},
	watch: {
		playerHealth() {
			this.percentPlayerHp = this.playerHealth / (this.genPercentPlayerHp/100);
			if (this.playerHealth >= this.genPercentPlayerHp) {
				this.playerHealth = this.genPercentPlayerHp;
			}
			// console.log(this.playerHealth);
		},
		playerMana() {
			this.percentPlayerMana = this.playerMana / (this.genPercentPlayerMana/100);
			if (this.playerMana >= this.genPercentPlayerMana) {
				this.playerMana = this.genPercentPlayerMana;
			} else if(this.playerMana <= 0) {
				this.playerMana = 0;
			}
		},
	}
})