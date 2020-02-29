<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="(id + '-title')" aria-hidden="true" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="(id + '-title')">
                        {{ title }}
                    </h5>
                    <button type="button" data-dismiss="modal" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BootstrapModal",

    beforeyDestroy() {
        $("#" + this.id).modal("hide");
        this.$emit("destroyed");
    },

	props: {
		title: {
			type: String,
			required: true
        },

		id: {
			type: [String, Number],
			required: true
		}
	},
};
</script>
