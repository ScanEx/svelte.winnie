*Управление конструктором приложений

---

Примеры
------
  * [config=RSO4E](https://originalsin.github.io/svelte.geomixer/public/?config=RSO4E) - пермалинк 1 (по умолчанию)
  * [config=7ZSC4](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4) - пермалинк 2 (по умолчанию)
  * [config=7ZSC4](https://originalsin.github.io/svelte.geomixer/public/?config=196JI&edit=1) - пермалинк 3 (редактирование `edit=1`)

  
 Для работы примера сделайте пермалинк от winnie.kosmosnimki.ru и добавьте его в URL ?config=NALXY
 
 ### Параметры ключей конструктора

Свойство|По умолчанию|Значения|Описание и примеры
------|:---------:|:-----------|:-----------
theme|`dark`| `dark`, `white` | стилевая схема приложения.<br>[переключение стилевой схемы на `theme=white`](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4&theme=white)
iconSidebar|`true`|`true`, `false`| управление контролом Sidebar.<br>[отключение контрола Sidebar `iconSidebar=false`](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4&iconSidebar=false)
treeView|`true`|`true`, `false`, `opened`| дерево-легенда слоев.<br> [отключение `treeView=false`](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4&iconSidebar=false)
iconLayers|`true`|`true`, `false`| управление контролом iconLayers.<br> [отключение контрола iconLayers `iconLayers=false`](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4&iconLayers=false)
drawing|`true`|`true`, `false`| управление контролом gmxDrawing.<br> [отключение контрола gmxDrawing `drawing=false`](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4&drawing=false)
gmxTimeline|`true`|`true`, `false`| управление контролом gmxTimeline.<br> [отключение контрола gmxTimeline `gmxTimeline=false`](https://originalsin.github.io/svelte.geomixer/public/?config=196JI&gmxTimeline=false)

Все вышеперечисленные ключи могут указываться как в свойствах приложения так и в параметрах URL приложения.
В параметрах URL приложения можно указывать дополнительный ключ `edit=1` для отображения параметров приложения.


 ### Пример параметров конфигурации конструктора
`{`
  `"app": {`
    `"gmxMap": {`
      `"mapID": "ATTBP",`
      `"apiKey": "DV62UD5A78"`
    `},`
    `"theme": "dark",`
    `"iconSidebar": true,`
    `"treeView": true,`
    `"iconLayers": true,`
    `"drawing": false,`
    `"gmxTimeline": true`
  `},`
  `"state": {`
    `"map": {`
      `"position": {`
        `"x": 88.59375000000001,`
        `"y": 59.355596110016315,`
        `"z": 3`
      `}`
    `},`
    `"calendar": {`
      `"version": "1.1.0",`
      `"dateBegin": 1542067200000,`
      `"dateEnd": 1542153600000`
    `},`
    `"baseLayersManager": {`
      `"version": "1.0.0",`
      `"currentID": "sputnik",`
      `"activeIDs": [`
        `"satellite",`
        `"sputnik",`
        `"here",`
        `"here_hyb",`
        `"OSMHybrid",`
        `"empty",`
        `"agroRelief",`
        `"slope",`
        `"aspect"`
      `]`
    `},`
    `"layersTree": {`
      `"expanded": {`
        `"8Tq6kDaDdiXTPahQ": false,`
        `"O20voTbJf5ituSW9": false,`
        `"vmxVgP21s0kA2OHw": false,`
        `"pUJpeZzMEFhrlpuM": false,`
        `"63B00BB3B936416A9FC8F51AA56804E1": true,`
        `"10riUTvti2NTfC5I": false,`
        `"50D44BE4164F4E3594B5F7C02A60E66D": false,`
        `"0E2E354D0BAA45498A48367615E2B4FC": false,`
        `"snBwe5yM3Gr7mJ68": false,`
        `"sRFAyNt60qdTa8wB": false,`
        `"LfcC9XEk9D6kZOz3": false,`
        `"IPCByT94sAUJQTCn": false`
      `},`
      `"visible": {`
        `"8EE2C7996800458AAF70BABB43321FA4": true`
      `}`
    `}`
  `}`
`}`
