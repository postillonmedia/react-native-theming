/**
 * Created by DanielL on 15.06.2017.
 */

import Subscription from './utils/Subscription';

export class ThemeSubscription extends Subscription {
    
    constructor(theme) {
        super();
        
        this.theme = theme;
    }
    
    setTheme(theme) {
        this.theme = theme;
        
        this.notify(theme);
    }
    
    getTheme() {
        return this.theme;
    }
    
}