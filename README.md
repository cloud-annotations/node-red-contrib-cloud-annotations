# node-red-contrib-cloud-annotations

[![NPM version](https://badge.fury.io/js/node-red-contrib-cloud-annotations.svg)](http://www.npmjs.org/package/node-red-contrib-cloud-annotations)
[![Dependencies Status](https://david-dm.org/cloud-annotations/node-red-contrib-cloud-annotations/status.svg)](https://david-dm.org/cloud-annotations/node-red-contrib-cloud-annotations)

A [Node-RED](http://nodered.org) node for making predictions with Cloud Annotations models.

![example](example.png)

## Install

Run the following command in your Node-RED user directory - typically `~/.node-red`:

```
npm install node-red-contrib-cloud-annotations
```


## Usage

Feed the model an image and get a list of predictions.


### Configuration

- `Model path`: The path to the Cloud Annotations model.


### Input

- `msg.payload`: The payload can either be a string path to an image file or a buffer object holding the image bytes.

### Output

- `msg.payload`: A list of predictions.

The prediction array varies depending on the type of model loaded.

Object detection model example:
```js
[{
  label: 'dog',
  bbox: [
    330.9269714355469, // x coordinate
    281.0324728488922, // y coordinate
    374.56329345703125, // width
    550.1768910884857 // height
  ],
  score: 0.92
},
{
  label: 'cat',
  bbox: [
    1168.9867401123047, // x coordinate
    431.68705701828003, // y coordinate
    412.3546600341797, // width
    522.2745037078857 // height
  ],
  score: 0.72
}]
```

Classification model example:
```js
[
  { label: 'dog', score: 0.92 },
  { label: 'cat', score: 0.72 }
]
```
