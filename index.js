'use strict';

// render ple
let ple = null;
ReactDOM.render(
	React.createElement(PhotoLayoutEditor, {
		ref: function(r) { ple = r; },
		body: {
			grid: [
				{ layout: { x: 0, y: 0, w: 2, h: 2 } },
				{ layout: { x: 2, y: 0, w: 1, h: 2 } },
				{ layout: { x: 3, y: 0, w: 2, h: 1 } },
				{ layout: { x: 3, y: 1, w: 1, h: 1 } },
			]
		},
		side: {
			files: [
				'http://goose.redgoose.me/data/upload/original/201707/rg-20170707-000177.jpg',
				'http://goose.redgoose.me/data/upload/original/201703/rg-20170307-000116.jpg',
				'http://goose.redgoose.me/data/upload/original/201703/rg-20170306-000104.jpg',
				'http://goose.redgoose.me/data/upload/original/201707/rg-20170704-000151.jpg',
				'http://goose.redgoose.me/data/upload/original/201702/rg-20170110-000091.jpg',
				'http://goose.redgoose.me/data/upload/original/201703/rg-20170110-000094.jpg',
				'http://goose.redgoose.me/data/upload/original/201507/rg3310.jpg',
				'http://goose.redgoose.me/data/upload/original/201503/ce88b697650b8cba1c11d1abc2976263.jpg',
			]
		}
	}),
	document.getElementById('app')
);


// pick images
function pickImages(count=3)
{
	const sampleImages = [
		'http://goose.redgoose.me/data/upload/original/201501/a93e9f2c844c4e8d6a80c89c9e3840ec.jpg',
		'http://goose.redgoose.me/data/upload/original/201703/rg-20170306-000104.jpg',
		'http://goose.redgoose.me/data/upload/original/201703/rg-20170110-000094.jpg',
		'http://goose.redgoose.me/data/upload/original/201611/junk_20161108-1.jpg',
		'http://goose.redgoose.me/data/upload/original/201610/rg3839.jpg',
		'http://goose.redgoose.me/data/upload/original/201701/20161120_000.jpg',
		'http://goose.redgoose.me/data/upload/original/201511/rg3612.jpg',
		'http://goose.redgoose.me/data/upload/original/201508/rg3396.jpg',
		'http://goose.redgoose.me/data/upload/original/201503/cdb2f4958151df4c96af89f5d2e829a9.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/a89cf80d5ed1aa61a1c99a2c22268c53.jpg',
		'http://goose.redgoose.me/data/upload/original/201503/ce88b697650b8cba1c11d1abc2976263.jpg',
		'http://goose.redgoose.me/data/upload/original/201507/rg3304.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/3487d4a6a73ed3419ef3052f3522d5b0.jpg',
		'http://goose.redgoose.me/data/upload/original/201502/f6d98ae06d771a043817f897e22b54c6.jpg',
		'http://goose.redgoose.me/data/upload/original/201311/8714a22520793021e1765b74090ed857.jpg',
		'http://goose.redgoose.me/data/upload/original/201212/scripter2156.jpg',
	];
	let images = Object.assign([], sampleImages);
	let result = [];

	(function get() {
		if (count <= 0) return;
		result.push(images.splice(Math.floor(Math.random() * images.length), 1)[0]);
		count--;
		get();
		if (count >= 1) get();
	})();

	return result;
}


// action
function action(id, value)
{
	switch(id)
	{
		// SIDE
		case 'side.add':
			ple.api.side.add(pickImages(3));
			break;
		case 'side.selection':
			ple.api.side.selection([2, 4, 6]);
			break;
		case 'side.select':
			ple.api.side.select({
				0: { active: false },
				1: { active: true },
				2: { active: false },
				3: { active: true }
			});
			break;
		case 'side.toggleSelectAll':
			ple.api.side.toggleSelectAll();
			break;
		case 'side.selectedRemoveItems':
			ple.api.side.remove(
				ple.api.side.getKeys('selected')
			);
			break;
		case 'side.clear':
			ple.api.side.clear();
			break;
		case 'side.attachToGrid':
			ple.api.side.attachToGrid(
				ple.api.side.getKeys('selected')
			);
			break;
		case 'side.upload':
			ple.api.side.upload(value.files, {
				start: function() {
					console.log('upload start');
				},
				progress: function(loaded, total, percent) {
					console.log('upload progress', loaded, total, percent);
				},
				complete: function(res) {
					console.log('upload complete', res);
				},
				completeAll: function() {
					console.log('upload complete all');
				},
				fail: function(error) {
					console.log('upload fail', error);
				},
			});
			break;
		case 'side.getItems':
			let sideGetItems = ple.api.side.getItems(
				ple.api.side.getKeys('selected')
			);
			console.log('side.getItems', sideGetItems);
			break;
		case 'side.getImages':
			let sideGetImages = ple.api.side.getImages(
				ple.api.side.getKeys('selected')
			);
			console.log('side.getImages', sideGetImages);
			break;

		// GRID
		case 'grid.getKeys':
			console.log('get keys:', ple.api.grid.getKeys('selected'));
			break;
		case 'grid.getBlocks':
			console.log('get blocks:', ple.api.grid.getBlocks('selected'));
			break;
		case 'grid.shuffle':
			ple.api.grid.shuffle({ w: 3, h: 3 });
			break;
		case 'grid.assignImages':
			ple.api.grid.assignImages(pickImages(4));
			break;
		case 'grid.assignImage':
			ple.api.grid.assignImage(0, pickImages(1)[0]);
			break;
		case 'grid.update':
			let gridUpdate_blocks = ple.api.grid.getBlocks('selected');
			if (!Object.keys(gridUpdate_blocks).length) return;
			Object.keys(gridUpdate_blocks).forEach((k) => {
				gridUpdate_blocks[k].color = 'rgba(126,211,33,1)';
			});
			ple.api.grid.update(gridUpdate_blocks);
			break;
		case 'grid.add':
			ple.api.grid.add([{
				layout: { w: 1, h: 1 },
				color: 'rgba(126,211,33,1)',
			}]);
			break;
		case 'grid.remove':
			ple.api.grid.remove(
				ple.api.grid.getKeys('selected')
			);
			break;
		case 'grid.select':
			ple.api.grid.select([0,2,3]);
			break;
		case 'grid.unselect':
			ple.api.grid.unselect([2,3]);
			break;
		case 'grid.toggleSelectAll':
			ple.api.grid.toggleSelectAll();
			break;
		case 'grid.duplicate':
			ple.api.grid.duplicate(
				ple.api.grid.getKeys('selected')
			);
			break;
		case 'grid.getPreference':
			console.log('side.getPreference', ple.api.grid.getPreference());
			break;
		case 'grid.setPreference':
			ple.api.grid.setPreference({
				width: 80,
				column: 6,
				innerMargin: 5,
			});
			break;

		// Util
		case 'util.toggleSide':
			ple.api.util.toggleSide();
			break;
		case 'util.export.side':
			console.log('export(side)', ple.api.util.export('side'));
			break;
		case 'util.export.grid':
			console.log('export(grid)', ple.api.util.export('grid'));
			break;
		case 'util.export.preference':
			console.log('export(preference)', ple.api.util.export('preference'));
			break;
		case 'util.export.all':
			console.log('export(all)', ple.api.util.export('all'));
			break;
		case 'util.import.side':
			ple.api.util.import({ side: pickImages(3) }, true);
			break;
		case 'util.import.grid':
			ple.api.util.import({
				grid: [
					{ color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
					{ color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
					{ color: '#b188ff', layout: { w: 3, h: 1, y: 2, x: 0 } },
				]
			}, true);
			break;
		case 'util.import.preference':
			let utilImportPreference = ple.api.util.export('preference');
			utilImportPreference = Object.assign({}, utilImportPreference, {
				width: 120,
				height: 80,
				innerMargin: 2,
				bgColor: '#ffefc2'
			});
			ple.api.util.import({ utilImportPreference });
			break;
		case 'util.import.all':
			ple.api.util.import({
				side: pickImages(3),
				grid: [
					{ color: '#ee4149', layout: { w: 1, h: 1, x: 0 } },
					{ color: '#36b40d', layout: { w: 2, h: 2, x: Infinity } },
				],
				preference: Object.assign({}, ple.api.util.export('preference'), {
					width: 120,
					height: 80,
					innerMargin: 2,
					bgColor: '#ffefc2'
				})
			});
			break;
		case 'util.makeImage':
			let makeImage = ple.api.util.makeImage('jpg', .75, 1, 'base64');
			makeImage.progress(function(total, current, image) {
				console.log('PROGRESS', total, current, image);
			});
			makeImage.done(function(src) {
				console.warn('DONE');
				let output = document.getElementById('makeImageArea');
				output.innerHTML = `<img src="${src}" alt="output image"/>`;
			});
			makeImage.fail(function(error) {
				console.error('ERROR', error);
			});
			break;
	}
}