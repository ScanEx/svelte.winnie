*Управление конструктором приложений

---

Примеры
------
  * [config=RSO4E](https://originalsin.github.io/svelte.geomixer/public/?config=RSO4E) - пермалинк 1 (по умолчанию)
  * [config=7ZSC4](https://originalsin.github.io/svelte.geomixer/public/?config=7ZSC4) - пермалинк 2 (по умолчанию)

  
 Для работы примера сделайте пермалинк от winnie.kosmosnimki.ru и добавьте его в URL ?config=NALXY
 
 #### Параметры ключей конструктора

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
