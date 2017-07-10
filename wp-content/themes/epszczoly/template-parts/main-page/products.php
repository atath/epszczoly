<?php
    function get_products_id($catName) {
        $categories = get_categories();
        for($i = 0; $i < count($categories); $i++) {
            if($categories[$i] -> cat_name == $catName) {
                return $categories[$i] -> cat_ID;
            }
        };
    };
    $products = get_posts( array(
        'category' => get_products_id("produkty"),
        'numberposts' => 0,
    ));
?>
<section id="products" class="container">
    <h2 class="title">Czym charakteryzują się nasze miody</h2>
    <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam.</p>
    <div class="slider">
        <?php
            foreach ( $products as $product ) {
        ?>
        <?php 
            $blogAdrress = get_template_directory_uri();
            $featuredImage = wp_get_attachment_image_src( get_post_thumbnail_id($product->ID), 'large' );
            if ($featuredImage) {
                $imageSrc = $featuredImage[0];
            } else { 
                $imageSrc = $blogAdrress."/assets/images/pexels-photo-27644.jpg"; 
            } 
        ?>
        <div class="product">
            <h3 class="product-title"><?php echo get_the_title( $product->ID ); ?></h3>
            <div class="product-image" style="background-image: url(<?php echo $imageSrc; ?>);"></div>
        </div>
        <?php 
        }
        ?>
    </div>
</section>