'use strict';
const {createHash} = require('crypto');
const through2 = require('through2');
const {readFile} = require('fs-extra');

const action = async context => {
	const uploadEndpoint = 'https://api.zeit.co/v2/now/files';
	const deploymentEndpoint = 'https://api.zeit.co/v2/now/deployments';
	const Authorization = 'Bearer ' + context.config.get('token');

	context.setProgress('Read file…');
	const filePath = await context.filePath();
	const data = await readFile(filePath);
	const sha = createHash('sha1').update(data).digest('hex');
	const stream = through2();
	stream.write(data);
	stream.end();

	context.setProgress('Uploading…');
	await context.request(uploadEndpoint, {
		headers: {
			'Content-Type': 'application/octet-stream',
			'x-now-digest': sha,
			'x-now-size': data.length,
			Authorization
		},
		body: stream
	});

	context.setProgress('Creating Now deployment…');
	const deploymentResponse = await context.request(deploymentEndpoint, {
		headers: {
			Authorization
		},
		json: true,
		body: {
			name: context.config.get('name'),
			deploymentType: 'STATIC',
			files: [
				{
					file: context.defaultFileName,
					sha,
					size: data.length
				}
			]
		}
	});

	context.copyToClipboard(`https://${deploymentResponse.body.url}`);
	context.notify('URL to the video has been copied to the clipboard');
};

const now = {
	title: 'Share on Now',
	formats: ['gif', 'mp4', 'webm', 'apng'],
	action,
	config: {
		token: {
			title: 'Now token',
			description: 'Create one here https://zeit.co/account/tokens',
			type: 'string',
			default: '',
			required: true
		},
		name: {
			title: 'Name used in the deployment URL',
			type: 'string',
			default: 'kapture',
			required: true
		}
	}
};

exports.shareServices = [now];
