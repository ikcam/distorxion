<?php
/*
Template Name: Home Page
*/
?>
<?php get_header() ?>

	<section id="container">
		<section id="content">

<?php the_post() ?>

			<article id="post-<?php the_ID() ?>" class="<?php sandbox_post_class() ?>">
				<h2 class="entry-title"><span>Ch</span>at</h2>
				<div class="entry-content">
<?php the_content() ?>

<?php if (function_exists('simple_ajax_chat')) simple_ajax_chat(); ?>

					<div class="clearfix"></div>
<?php wp_link_pages('before=<div class="page-link">' . __( 'Pages:', 'sandbox' ) . '&after=</div>') ?>

<?php edit_post_link( __( 'Edit', 'sandbox' ), '<span class="edit-link">', '</span>' ) ?>

				</div>
			</article><!-- .post -->

<?php comments_template(); ?>

		</section><!-- #content -->
	</section><!-- #container -->

<?php get_sidebar() ?>
<?php get_footer() ?>