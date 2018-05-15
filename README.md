# kap-now [![Build Status](https://travis-ci.org/lucaperret/kap-now.svg?branch=master)](https://travis-ci.org/lucaperret/kap-now) [![npm](https://img.shields.io/npm/dt/kap-now.svg)](https://www.npmjs.com/package/kap-now)

![Now logo](now.png?raw=true "now.sh")

> [Kap](https://github.com/wulkano/kap) plugin - Share on [▲ZEIT now](https://zeit.co/now)

## Install

In the `Kap` menu, go to `Preferences…`, select the `Plugins` pane, find this plugin, and click `Install`.

You should also add your [Now token](https://zeit.co/account/tokens) to the plugin configuration.
In the `Plugins` pane, click `Open plugins folder`, edit the `kap.json` file to add a `token` property with your token value:

```
{
    "token": "yourNowToken"
}
```

## Usage

In the editor, after recording, select one of the export formats, and then `Share on Now`.

## License

MIT © [Luca Perret](https://github.com/lucaperret)
