import { Component } from '@angular/core';
import { CLIPBOARD_OPTIONS, MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
    selector: 'app-root',
    imports: [MarkdownComponent],
    providers: [
        provideMarkdown({
            clipboardOptions: {
                provide: CLIPBOARD_OPTIONS,
                useValue: {},
            },
        }),
    ],
    templateUrl: './about.html'
})
export class About {
}
