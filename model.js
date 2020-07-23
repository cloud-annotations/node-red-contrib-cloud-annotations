const fs = require("fs");
const models = require("@cloud-annotations/models-node");

module.exports = (RED) => {
  function ModelNode(config) {
    RED.nodes.createNode(this, config);
    this.path = config.path;
    const node = this;

    node.status({ fill: "grey", shape: "ring", text: "loading..." });

    let model;

    models
      .load(node.path)
      .then((m) => {
        model = m;
        if (model.type === "detection") {
          node.status({
            fill: "green",
            shape: "dot",
            text: "object detection",
          });
        } else {
          node.status({
            fill: "green",
            shape: "dot",
            text: "classification",
          });
        }
      })
      .catch(() => {
        node.status({
          fill: "red",
          shape: "dot",
          text: "failed to load model",
        });
      });

    node.on("input", async (msg) => {
      let image = msg.payload;

      // If image is a string assume it is a filepath.
      if (typeof image === "string") {
        image = fs.readFileSync(msg.payload);
      }

      if (model.type === "detection") {
        const results = await model.detect(image);
        msg.payload = results;
        node.send(msg);
      } else {
        const results = await model.classify(image);
        msg.payload = results;
        node.send(msg);
      }
    });
  }
  RED.nodes.registerType("model", ModelNode);
};
