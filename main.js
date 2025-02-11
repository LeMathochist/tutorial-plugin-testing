const { entrypoints } = require("uxp");

  showAlert = () => {
    alert("This is an alert message");
  }

  entrypoints.setup({
    commands: {
      showAlert,
    },
    panels: {
      vanilla: {
        show(node ) {
        }
      }
    }
  });

function showLayerNames() {
    const app = require("photoshop").app;
    const allLayers = app.activeDocument.layers;
    const allLayerNames = allLayers.map(
      // show the layer name, as well as the layer opacity settings as 
      // percentage (%)
      (layer) => `${layer.name}`
      );
    // organize the layers alphabetically for readability
    const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    document.getElementById("layers").innerHTML = `
      <ul>${
        sortedNames.map(name => `<li>${name}</li>`).join("")
      }</ul>`;
};

function renameLayerNames() {
  return window.require("photoshop").core.executeAsModal(
    () => {
      // Grants Document Write Access by executing as if within a Modal Context

      const app = window.require("photoshop").app;
      
      app.activeDocument.layers.forEach( 
        (layer) => {
          // prevent repeated appends of opacity value with regex lookup
          const regExp = /^(.*?)( \(\d+ %\))?$/;
          const baseName = layer.name.match(regExp)[1];
          layer.name = `${baseName} (${layer.opacity} %)`;
      });
    },
    {
      commandName: "Rename layers",
    }
  );
};


async function exportReport() {
  // create a TSV String; this is the header row
  let tsvString = "Base name\tOpacity\tIsVisible";

  const app = window.require("photoshop").app;
  app.activeDocument.layers.forEach( (layer) => {
  
    tsvString +=
      "\n" +
      layer.name +
      "\t" +
      layer.opacity +
      "\t" +
      (layer.visible ? "yes" : "no");
  });

  // save the string to the filesystem as "layers.tsv"
  const storage = window.require("uxp").storeage;
  const file = await storage.localFileSystem.getFileForSaving("layers.tsv");
  await file.write(tsvString);
};

document
.getElementById("btnRename")
.addEventListener("click", renameLayerNames);
document
  .getElementById("btnExport")
  .addEventListener("click", exportReport);