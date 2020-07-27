export default
`<div class="modal fade" id="productDetailModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Product Detail</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                Product: {{clickedproduct.title}}
                <br>
                Category: {{clickedproduct.category}}
                <br>
                Content: {{clickedproduct.content}}
                <br>
                Price: $ {{clickedproduct.price}} / {{clickedproduct.unit}}
                <br>
                <img :src="clickedproduct.imageUrl[0]" alt="" class='modal__img'></img>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    </div>
</div>`