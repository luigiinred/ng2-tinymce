# Angular2 - TinyMCE Module

Add TinyMCE to your Project
```
npm install ng2-tinymce
```

```
import 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'

// Plugins
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/autoresize/plugin'
import { TinymceModule } from 'ng2-tinymce';
```


## Usage
```
<tinymce [(ngModel)]="commentContent" [initVal]="commentContent"></tinymce>
```