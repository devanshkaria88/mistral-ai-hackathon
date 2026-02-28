import 'package:flutter/material.dart';
import 'package:audioplayers/audioplayers.dart';
import '../theme/theme.dart';

class AppAudioPlayer extends StatefulWidget {
  const AppAudioPlayer({
    super.key,
    required this.audioUrl,
    this.onComplete,
  });

  final String audioUrl;
  final VoidCallback? onComplete;

  @override
  State<AppAudioPlayer> createState() => _AppAudioPlayerState();
}

class _AppAudioPlayerState extends State<AppAudioPlayer> {
  late final AudioPlayer _player;
  bool _isPlaying = false;
  bool _isLoading = false;
  Duration _duration = Duration.zero;
  Duration _position = Duration.zero;

  @override
  void initState() {
    super.initState();
    _player = AudioPlayer();
    _setupListeners();
  }

  void _setupListeners() {
    _player.onPlayerStateChanged.listen((state) {
      if (mounted) {
        setState(() {
          _isPlaying = state == PlayerState.playing;
          _isLoading = state == PlayerState.stopped && _duration == Duration.zero;
        });
      }
    });

    _player.onDurationChanged.listen((duration) {
      if (mounted) {
        setState(() => _duration = duration);
      }
    });

    _player.onPositionChanged.listen((position) {
      if (mounted) {
        setState(() => _position = position);
      }
    });

    _player.onPlayerComplete.listen((_) {
      if (mounted) {
        setState(() {
          _position = Duration.zero;
          _isPlaying = false;
        });
        widget.onComplete?.call();
      }
    });
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }

  Future<void> _togglePlayPause() async {
    if (_isPlaying) {
      await _player.pause();
    } else {
      setState(() => _isLoading = true);
      try {
        await _player.play(UrlSource(widget.audioUrl));
      } finally {
        if (mounted) {
          setState(() => _isLoading = false);
        }
      }
    }
  }

  Future<void> _seek(double value) async {
    final position = Duration(milliseconds: value.toInt());
    await _player.seek(position);
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = duration.inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$minutes:$seconds';
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: AppColors.surfaceVariant,
        borderRadius: AppRadius.borderRadiusMd,
      ),
      child: Row(
        children: [
          _buildPlayButton(),
          AppSpacing.horizontalSm,
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SliderTheme(
                  data: SliderThemeData(
                    trackHeight: 4,
                    thumbShape: const RoundSliderThumbShape(
                      enabledThumbRadius: 6,
                    ),
                    overlayShape: const RoundSliderOverlayShape(
                      overlayRadius: 14,
                    ),
                    activeTrackColor: AppColors.accent,
                    inactiveTrackColor: AppColors.border,
                    thumbColor: AppColors.accent,
                    overlayColor: AppColors.accent.withValues(alpha: 0.2),
                  ),
                  child: Slider(
                    value: _position.inMilliseconds.toDouble(),
                    max: _duration.inMilliseconds.toDouble().clamp(1, double.infinity),
                    onChanged: _seek,
                  ),
                ),
              ],
            ),
          ),
          AppSpacing.horizontalSm,
          Text(
            '${_formatDuration(_position)} / ${_formatDuration(_duration)}',
            style: AppTypography.labelSmall,
          ),
        ],
      ),
    );
  }

  Widget _buildPlayButton() {
    if (_isLoading) {
      return const SizedBox(
        width: 40,
        height: 40,
        child: Padding(
          padding: EdgeInsets.all(8),
          child: CircularProgressIndicator(
            strokeWidth: 2,
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.accent),
          ),
        ),
      );
    }

    return IconButton(
      onPressed: _togglePlayPause,
      icon: Icon(
        _isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
        color: AppColors.accent,
        size: 28,
      ),
      style: IconButton.styleFrom(
        backgroundColor: AppColors.surface,
        shape: const CircleBorder(),
      ),
    );
  }
}
