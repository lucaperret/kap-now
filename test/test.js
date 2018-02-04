import test from 'ava';
import kapPluginTest from 'kap-plugin-test';

test(async t => {
	const plugin = kapPluginTest('test/fixtures/unicorn.gif', {
		config: {
			token: 'ETrTpnvsIDdtMCnuF1zw0wiJ',
			name: 'kapture'
		}
	});
	plugin.context.request.resolves({
		body: {
			url: 'kapture-934893485.now.sh'
		}
	});

	await plugin.run();

	t.is(plugin.context.request.lastCall.args[0], 'https://api.zeit.co/v2/now/deployments');
	t.true(plugin.context.copyToClipboard.calledWith('https://kapture-934893485.now.sh'));
});
