<?php
$posts = get_posts( array(
   'numberposts' => 3
) );
?>
<?php 
    if( $posts ) {
?>
<section id="news" class="container">
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
        <div class="col-sm-12 col-md-4">
            <a href="<?php echo get_permalink( $post->ID ) ?>">
                <?php $featuredImage = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' ); ?>
                <div class="news-image">
                    <img src="
                <?php 
                    if ($featuredImage) {
                       echo  $featuredImage[0];
                    } else { 
                        echo bloginfo( 'template_url' ).'/assets/images/pexels-photo-27644.jpg'; 
                    } ?>" alt="">    
                </div>
                
                <span class="date"><?php echo get_the_time('d/m/Y', $post->ID); ?></span>
                <h3 class="news-title"><?php echo get_the_title( $post->ID ); ?></h3>
                <p class="text"><?php echo wp_strip_all_tags(get_extended ( $post->post_content )['main']); ?></p>
            </a>
        </div>    
        <?php 
        }
        ?>
    </div>
</section>
<?php 
}
?>