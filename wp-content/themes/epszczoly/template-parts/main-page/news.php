<?php
$args = array(
  'numberposts' => 6,
  'category' => get_products_id('aktualności')
);
 
$posts = get_posts( $args );
?>
<?php 
    if( $posts ) {
?>
<section id="news">
    <div class="row">
        <div class="col-sm-12">
            <h2 class="title">Co w ulu słychać</h2>
            <p class="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum!</p>
        </div>
    </div>
    <div class="row">
        <?php
        foreach ( $posts as $post ) {
            ?>
        <div class="col-sm-3 col-md-3 col-xlg-2 news fadein-sequence">
            <div class="">
                <?php 
                    $blogAdrress = get_template_directory_uri();
                    $featuredImage = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
                    if ($featuredImage) {
                        $imageSrc = $featuredImage[0];
                    } else { 
                        $imageSrc = $blogAdrress."/assets/images/pexels-photo-27644.jpg"; 
                    } 
                ?>
                <a href="<?php echo get_permalink( $post->ID ); ?>"><div class="news-image" style="background-image: url(<?php echo $imageSrc; ?>)"></div>
                <h3 class="news-title"><?php echo get_the_title( $post->ID ); ?></h3></a>
                <span class="date"><?php echo get_the_time('d/m/Y', $post->ID); ?></span>
                <span class="author"><?php echo get_the_author($post->ID); ?></span>
                <p class="text"><?php echo wp_trim_words( $post->post_content, 20, '...'); ?></p>
            </div>
            
        </div>    
        <?php 
        }
        ?>
    </div>
</section>
<?php 
}
?>