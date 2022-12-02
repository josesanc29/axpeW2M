import { TranslateService } from '@ngx-translate/core';

export class IdiomaHelper {

    // tslint:disable-next-line:typedef
    public static getLang(lang: string) {
        switch (lang) {
            case 'es':
                return 'Español';
            case 'en':
                return 'English';
        }

    }
}
