/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// Collection of common functions that used by almost all services
const common_functions = {
    /**
     * Construct full url from given parameters
     * @returns {String}
     */
    get_full_url(base_url, server, port) {
        return `${server}:${port}/${base_url}`;
    },

     /**
     * Add extra options to url
     * @param {String} url
     * @param {Object} globalOptions
     * @param {Object} localOptions 
     * @param {Object} required_parameters
     * @returns {String}
     */
    add_options_to_url(url, globalOptions, localOptions, required_parameters){
        // merge options passed by localy and globally NOTE: global options will override local on if same value passed from both of them
        let uniqueOptions = {...localOptions, globalOptions};
        let isThereAnyOptions = Object.keys(uniqueOptions);
        
        // check whether any parameters passed
        if(isThereAnyOptions.length > 0){
            // check whether limit parameter passed and it is required for particular endpoint (ex: it is not requrid for add())
            if(uniqueOptions['limit'] >= 0 && required_parameters['limit']){
                url = `${url}?limit=${uniqueOptions['limit']}`
            }

            // check whether det_prob_threshold parameter passed and is it required for particular endpoint
            if(uniqueOptions['det_prob_threshold'] >= 0 && required_parameters['det_prob_threshold']){
                url = `${url}&det_prob_threshold=${uniqueOptions['det_prob_threshold']}`
            }

            // check whether prediction_count passed and is it required for particular endpoint
            if(uniqueOptions['prediction_count'] >= 0 && required_parameters['prediction_count']){
                url = `${url}&prediction_count=${uniqueOptions['prediction_count']}`
            }

            // check whether face_plugins passed and is it required for particular endpoint
            if(uniqueOptions['face_plugins'] && required_parameters['face_plugins']){
                url = `${url}&face_plugins=${uniqueOptions['face_plugins']}`
            }

            // check whether status passed and is it required for particular endpoint
            if(uniqueOptions['status'] && required_parameters['status']){
                url = `${url}&status=${uniqueOptions['status']}`
            }
        }

        return url;
    }
}

export { common_functions }