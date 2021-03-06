/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { RecognizerResult, Activity } from 'botbuilder-core';
import { DialogContext } from 'botbuilder-dialogs';
import { Recognizer } from './recognizer';
import { LanguagePolicy } from '../languagePolicy';

export class MultiLanguageRecognizer implements Recognizer {

    public id: string;

    public languagePolicy: any = LanguagePolicy.defaultPolicy;

    public recognizers: { [locale: string]: Recognizer };

    public async recognize(dialogContext: DialogContext, activity: Activity): Promise<RecognizerResult> {
        const locale = activity.locale || '';
        let policy: string[] = [];
        if (this.languagePolicy.hasOwnProperty(locale)) {
            this.languagePolicy[locale].forEach((u: string): number => policy.push(u));
        }

        if (locale !== '' && this.languagePolicy.hasOwnProperty('')) {
            // we now explictly add defaultPolicy instead of coding that into target's policy
            this.languagePolicy[''].forEach((u: string): number => policy.push(u));
        }

        for (let i = 0; i < policy.length; i++) {
            const option = policy[i];
            if (this.recognizers.hasOwnProperty(option)) {
                const recognizer = this.recognizers[option];
                return await recognizer.recognize(dialogContext, activity);
            }
        }

        const recognizerResult: RecognizerResult = {
            text: activity.text || '',
            intents: {},
            entities: {}
        };
        return recognizerResult;
    }
}