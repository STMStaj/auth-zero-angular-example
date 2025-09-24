import { Component } from '@angular/core';
import { MarkdownComponent, MERMAID_OPTIONS, MermaidAPI, provideMarkdown } from 'ngx-markdown';

@Component({
    selector: 'app-root',
    imports: [MarkdownComponent],
    providers: [
        provideMarkdown()
    ],
    templateUrl: 'index.html',
    styleUrl: 'index.css'
})
export class Index {
    public mermaidOptions: MermaidAPI.MermaidConfig = {
        fontFamily: 'inherit',
    };
}
