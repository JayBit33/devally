<!-- (c) Waveybits Inc. <2021> -->
<!-- ALL RIGHTS RESERVED -->
<template>
    <div class="contact">
        <h1>Contact</h1>
        <div class="form-inputs">
            <form>
                <label>Name</label>
                <input />
                <label>Email</label>
                <input type="email" />
                <label> Reason</label>
                <dropdown
                class="reason-dropdown"
                :items="reasons"
                :isMultiSelect="false"
                :selectedItems="reason"
                @item-selection="reason = $event"
                >
                </dropdown>
                <label>Message</label>
                <textarea class="message" rows="18" />
                <button class="submit-btn" >Submit</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" >
    .contact {
        width: 100%;
        height: 100%;
        background-image: url('../assets/devs_bg.png');
        background-repeat: no-repeat;
        background-size: cover;
        
        h1 {
            font-family: 'Montserrat';
            font-weight: 600;
            text-align: center;
            padding-top: 2rem;
        }

        .form-inputs form {
            display: flex;
            flex-direction: column;
            align-items: center;
            label {
                font-family: 'Open Sans';
                font-weight: 600;
                text-align: left;
                margin: 1rem;
            }
            input {
                width: 30rem;
                padding: .5rem;
                border: 2px solid #ddd8d8;    
            }
            .reason-dropdown {
                width: 30rem;
                padding: .5rem;
            }
            .message {
                width: 29rem;
                resize: none;
                padding: 1rem;
                border: 2px solid #ddd8d8;    
            }
            .submit-btn {
                background-color: darken($secondary, 20%);
                color: white;
                border: none;
                outline: none;
                font-size: 1rem;
                font-weight: 400;
                margin-top: 1.5rem;
                margin-bottom: 20rem;
                margin-left: 1rem;
                padding: .75rem 1rem;
                max-height: 2.5rem;
                border-radius: .25rem;
                transition: .3s;

                &:hover {
                    background-color: $secondary;   
                }

            }
        }
    }
</style>
<script>
import Dropdown from '../components/dropdown/index';

export default {
    name: 'Contact',
    data() {
        return {
            reason: null,
            reasons: ['General', 'Report Bug', 'Account Question', 'Billing']
        }
    },
    components: {
        Dropdown
    }

}
</script>