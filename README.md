# Angular2 - TinyMCE Module

Add TinyMCE to your Project
```
npm install tinymce
```


Until I figure out how to get this setup on npm, you will need to copy the module to your project.
```
import '../../node_modules/tinymce/tinymce.js';
import '../../node_modules/tinymce/themes/modern/theme.js';
import '../../node_modules/tinymce/plugins/link/plugin.js';
import '../../node_modules/tinymce/plugins/paste/plugin.js';
import '../../node_modules/tinymce/plugins/table/plugin.js';
import '../../node_modules/tinymce/plugins/autoresize/plugin.js';
import { TinymceModule } from '../components/ng2-tinymce/index';
```


## Usage
```
<tinymce [(ngModel)]="commentContent" [initVal]="commentContent"></tinymce>
```